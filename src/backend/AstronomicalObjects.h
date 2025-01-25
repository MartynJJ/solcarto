#pragma once

#include "types.h"

#include <memory>
#include <utility>

namespace solcarto {

double calculate_orbit_radius(const double mass, const double velocity);

class AstronomicalGeneric {
  virtual Location get_current_location() { return location_; }

private:
  Location location_;
};

class CenterOfUniverse : AstronomicalGeneric {
  Location location_ = Location{
      .x = XCoord(0.0),
      .y = YCoord(0.0),
      .z = ZCoord(0.0),
  };
};

class AstronomicalBody : AstronomicalGeneric {

public:
  virtual EarthMass get_earth_mass() = 0;

private:
  EarthMass earth_mass_;
  std::shared_ptr<AstronomicalGeneric> parent_;
};

class Planet {
public:
  // Function to calculate position in orbit
  std::pair<double, double> getEarthPosition(double);
  // Location getPosition(double);

private:
  // Earth's orbit parameters
  // Location location_;
  double eccentricity = 0.0167;   // Earth's orbit eccentricity
  double semiMajorAxis = 149.6e6; // km, average distance from Sun
  double period = 365.24;         // Days in a year
};

} // namespace solcarto
