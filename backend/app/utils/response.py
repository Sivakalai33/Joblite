from flask import jsonify

def success_response(data=None,message="Success",status=200):
    return jsonify({
        "status" : "success",
        "message" : message,
        "data" : data
    }), status

def error_response(message="Error",status=400):
    return jsonify ({
        "status" : "Error",
        "message" : message
    }), status