package com.cars15.web;

import com.cars15.dto.ApiDtos.*;
import com.cars15.repository.BookingRepository;
import com.cars15.repository.CarRepository;
import com.cars15.repository.UserRepository;
import java.util.Comparator;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final CarRepository carRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public AnalyticsController(
            CarRepository carRepository,
            BookingRepository bookingRepository,
            UserRepository userRepository) {
        this.carRepository = carRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public AnalyticsResponse analytics() {
        var cars = carRepository.findAll();
        var mostViewed = cars.stream()
                .sorted(Comparator.comparingInt(com.cars15.domain.Car::getViews).reversed())
                .limit(3)
                .map(car -> new PopularCar(
                        car.getId(),
                        car.getBrand() + " " + car.getModel(),
                        car.getViews(),
                        car.getBookings()))
                .toList();
        var brandDemand = cars.stream()
                .collect(java.util.stream.Collectors.groupingBy(com.cars15.domain.Car::getBrand))
                .entrySet()
                .stream()
                .map(entry -> new BrandDemand(
                        entry.getKey(),
                        entry.getValue().size(),
                        entry.getValue().stream().mapToInt(com.cars15.domain.Car::getBookings).sum()))
                .toList();
        return new AnalyticsResponse(
                cars.size(),
                bookingRepository.count(),
                userRepository.count(),
                cars.stream().mapToLong(com.cars15.domain.Car::getViews).sum(),
                mostViewed,
                brandDemand);
    }
}
