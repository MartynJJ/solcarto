#include "AstronomicalObjects.h"

#include <pybind11/pybind11.h>

namespace py = pybind11;

PYBIND11_MODULE(solcarto, m) {
  m.doc() = "pybind11 example plugin"; // optional module docstring

  m.def("calculate_orbit_radius", &solcarto::calculate_orbit_radius,
        "A function that adds two numbers");
  py::class_<solcarto::Planet>(m, "SolarSystem")
      .def(py::init<>())
      .def("getEarthPosition", &solcarto::Planet::getEarthPosition);
  m.attr("__version__") = "0.0.1";
}

// c++ -O3 -Wall -shared -std=c++11 -fPIC $(python3 -m pybind11 --includes)
// binder.cpp -o cmake_example$(python3-config --extension-suffix)