
#pragma once
namespace solcarto {

template <typename T, typename Parameter> class StrongTypedef {
public:
  explicit StrongTypedef(T value) : m_value(value) {}

  // Explicitly convert back to the underlying type
  explicit operator T() const { return m_value; }

  // Only allow assignment from the same type
  StrongTypedef &operator=(const StrongTypedef &other) {
    m_value = other.m_value;
    return *this;
  }

  // Other operators can be defined as needed
  bool operator==(const StrongTypedef &other) const {
    return m_value == other.m_value;
  }
  bool operator!=(const StrongTypedef &other) const {
    return m_value != other.m_value;
  }

private:
  T m_value;
};
} // namespace solcarto