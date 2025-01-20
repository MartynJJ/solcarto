#pragma once

#include <utility>

namespace solcarto {
double calculate_orbit_radius(const double mass, const double velocity);

class SolarSystem {
public:
  // Function to calculate position in orbit
  std::pair<double, double> getEarthPosition(double);

private:
  // Earth's orbit parameters
  double eccentricity = 0.0167;   // Earth's orbit eccentricity
  double semiMajorAxis = 149.6e6; // km, average distance from Sun
  double period = 365.24;         // Days in a year
};

} // namespace solcarto