#include "AstronomicalObjects.h"
#include <cmath>

namespace solcarto {

double calculate_orbit_radius(const double mass, const double velocity) {
  // Placeholder for actual calculation
  return 150.0;
}

std::pair<double, double> Planet::getEarthPosition(double time) {
  // Time in days, converted to radians
  double t = time * (2 * M_PI) / period;
  double r = semiMajorAxis * (1 - eccentricity * eccentricity) /
             (1 + eccentricity * std::cos(t));

  // Polar to Cartesian conversion
  double x = r * std::cos(t);
  double y = r * std::sin(t);

  return {x, y};
}
}; // namespace solcarto
