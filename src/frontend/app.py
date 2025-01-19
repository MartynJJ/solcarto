from flask import Flask, jsonify, render_template

app = Flask(__name__,  static_folder='templates/img',  # Serve static files from here
            template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/orbits')
def get_orbits():
    # Example data
    orbit_data = {
        "Earth": {"orbitRadius": 150, "mass": 5.972e24},
        "Mars": {"orbitRadius": 227, "mass": 6.39e23},
        "Venus": {"orbitRadius": 108, "mass": 4.867e24}
    }
    return jsonify(orbit_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)