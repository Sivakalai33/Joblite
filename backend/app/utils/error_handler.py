def register_error_handlers(app):
    
    @app.errorhandler(404)
    def not_found(e):
        return {"status":"error","message":"Route not found"}, 404
    
    @app.errorhandler(500)
    def server_error(e):
        return {"status":"error","message":"Internal server error"}, 500