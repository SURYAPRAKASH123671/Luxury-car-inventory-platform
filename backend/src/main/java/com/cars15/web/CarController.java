package com.cars15.web;

import com.cars15.dto.ApiDtos.CarResponse;
import com.cars15.repository.CarRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/cars")
public class CarController {
    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @GetMapping
    public List<CarResponse> list(@RequestParam(required = false) String brand) {
        var cars = brand == null || brand.isBlank()
                ? carRepository.findAll()
                : carRepository.findByBrandIgnoreCase(brand);
        return cars.stream().map(CarResponse::from).toList();
    }

    @GetMapping("/{id}")
    public CarResponse detail(@PathVariable String id) {
        return carRepository.findById(id)
                .map(CarResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
    }
}
