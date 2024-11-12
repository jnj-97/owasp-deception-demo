from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "Requests"
COLLECTION_NAME = 'request'

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def extract_request_info():
    """Extract relevant information from the request."""
    return {
        'timestamp': datetime.utcnow(),
        'method': request.method,
        'url': request.url,
        'headers': dict(request.headers),
        'args': dict(request.args),
        'form': dict(request.form),
        'json': request.get_json(silent=True),
        'files': {
            name: {
                'filename': file.filename,
                'content_type': file.content_type,
                'content_length': len(file.read()) if file else 0
            } for name, file in request.files.items()
        },
        'remote_addr': request.remote_addr,
        'user_agent': str(request.user_agent)
    }

@app.before_request
def log_request_info():
    """Middleware to log all request information to MongoDB."""
    try:
        request_info = extract_request_info()
        collection.insert_one(request_info)
    except Exception as e:
        app.logger.error(f"Failed to log request: {str(e)}")

@app.route('/', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'])
def handle_request():
    """Handle incoming requests and return stored request count."""
    try:
        total_requests = collection.count_documents({})
        return jsonify({
            'message': 'Request processed successfully',
            'total_requests_logged': total_requests,
            'method': request.method
        }), 200
    except Exception as e:
        return jsonify({
            'error': 'Failed to process request',
            'message': str(e)
        }), 500

# @app.route('/requests', methods=['GET'])
# def get_requests():
#     """Retrieve logged requests with optional filtering."""
#     try:
#         # Get query parameters
#         limit = int(request.args.get('limit', 10))
#         skip = int(request.args.get('skip', 0))
        
#         # Get requests from MongoDB
#         requests = list(collection.find(
#             {},
#             {'_id': 0}  # Exclude MongoDB _id field
#         ).sort('timestamp', -1).skip(skip).limit(limit))
        
#         return jsonify({
#             'requests': requests,
#             'total': collection.count_documents({}),
#             'limit': limit,
#             'skip': skip
#         }), 200
#     except Exception as e:
#         return jsonify({
#             'error': 'Failed to retrieve requests',
#             'message': str(e)
#         }), 500

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5001))
    
    # Run the application
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    )