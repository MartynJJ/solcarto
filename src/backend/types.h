#pragma once

#include "strong_type.h"

namespace solcarto {

struct EarthMassTag {};
using EarthMass = StrongTypedef<double, EarthMassTag>;

struct KilogramTag {};
using Kilogram = StrongTypedef<double, KilogramTag>;

struct XCoord_Tag {};
using XCoord = StrongTypedef<double, XCoord_Tag>;

struct YCoord_Tag {};
using YCoord = StrongTypedef<double, YCoord_Tag>;

struct ZCoord_Tag {};
using ZCoord = StrongTypedef<double, ZCoord_Tag>;

struct Location {
  XCoord x;
  YCoord y;
  ZCoord z;
};

} // namespace solcarto