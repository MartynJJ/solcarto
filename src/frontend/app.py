# from flask import Flask, jsonify, render_template

# app = Flask(__name__,  static_folder='static/', 
#             template_folder='templates')

# @app.route('/')
# def home():
#     return render_template('index.html')

# @app.route('/api/orbits')
# def get_orbits():
#     # Example data
#     orbit_data = {
#         "Earth": {"orbitRadius": 150, "mass": 5.972e24},
#         "Mars": {"orbitRadius": 227, "mass": 6.39e23},
#         "Venus": {"orbitRadius": 108, "mass": 4.867e24}
#     }
#     return jsonify(orbit_data)

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)

from flask import Flask, render_template, send_from_directory, make_response
import solcarto
import mimetypes

app = Flask(__name__,  static_folder='static/', 
            template_folder='templates')
solcarto_instance = solcarto.SolarSystem()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/earth-position/<float:time>')
def earth_position(time):
    x, y = solcarto_instance.getEarthPosition(time)
    # scaleFactor = 1e-7; 
    # print(f"Earth: {x*scaleFactor} - {y*scaleFactor}")
    return {'x': x, 'y': y}
# @app.route('/static/js/<path:filename>')
# def serve_js(filename):
#     # Ensure the correct MIME type is set
#     response = make_response(send_from_directory('static/js', filename))
#     response.headers['Content-Type'] = mimetypes.guess_type(filename)[0] or 'application/javascript'
#     return response
# 
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5001)