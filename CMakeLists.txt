project(solcarto)
cmake_minimum_required(VERSION 3.10)

add_library(mymath STATIC src/backend/mymath.cpp)
set_target_properties(mymath PROPERTIES POSITION_INDEPENDANT_CODE ON)

add_subdirectory(src/thirdparty/pybind11)

pybind11_add_module(solcarto src/backend/binder.cpp)
target_link_libraries(solcarto PRIVATE mymath)

set_target_properties(solcarto PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/src/backend
)