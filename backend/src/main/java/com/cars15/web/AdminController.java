package com.cars15.web;

import com.cars15.domain.BookingStatus;
import com.cars15.domain.Car;
import com.cars15.dto.ApiDtos.*;
import com.cars15.repository.BookingRepository;
import com.cars15.repository.CarRepository;
import com.cars15.repository.PriceAlertRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final BookingRepository bookingRepository;
    private final PriceAlertRepository priceAlertRepository;
    private final CarRepository carRepository;

    public AdminController(
            BookingRepository bookingRepository,
            PriceAlertRepository priceAlertRepository,
            CarRepository carRepository) {
        this.bookingRepository = bookingRepository;
        this.priceAlertRepository = priceAlertRepository;
        this.carRepository = carRepository;
    }

    @GetMapping("/cars")
    public List<CarResponse> cars() {
        return carRepository.findAll()
                .stream()
                .map(CarResponse::from)
                .toList();
    }

    @PostMapping("/cars")
    public CarResponse createCar(@Valid @RequestBody CarUpsertRequest request) {
        if (carRepository.existsById(request.id())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Car id already exists");
        }
        Car car = new Car();
        applyCarRequest(car, request);
        return CarResponse.from(carRepository.save(car));
    }

    @PutMapping("/cars/{id}")
    public CarResponse updateCar(@PathVariable String id, @Valid @RequestBody CarUpsertRequest request) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
        applyCarRequest(car, request);
        car.setId(id);
        return CarResponse.from(carRepository.save(car));
    }

    @DeleteMapping("/cars/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCar(@PathVariable String id) {
        if (!carRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found");
        }
        carRepository.deleteById(id);
    }

    @GetMapping("/bookings")
    public List<BookingResponse> bookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(BookingResponse::from)
                .toList();
    }

    @PatchMapping("/bookings/{id}/status")
    public BookingResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody BookingStatusRequest request) {
        var booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        BookingStatus status = request.status();
        booking.setStatus(status);
        return BookingResponse.from(bookingRepository.save(booking));
    }

    @GetMapping("/alerts")
    public List<AlertResponse> alerts() {
        return priceAlertRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(AlertResponse::from)
                .toList();
    }

    private void applyCarRequest(Car car, CarUpsertRequest request) {
        car.setId(request.id());
        car.setBrand(request.brand());
        car.setModel(request.model());
        car.setVariant(request.variant());
        car.setYear(request.year());
        car.setMileage(request.mileage());
        car.setTransmission(request.transmission());
        car.setFuelType(request.fuelType());
        car.setBodyType(request.bodyType());
        car.setLocation(request.location());
        car.setPrice(request.price());
        car.setImage(request.image());
        car.setImages(request.images() == null || request.images().isEmpty()
                ? List.of(request.image())
                : request.images());
        car.setDescription(request.description());
        car.setFeatures(request.features() == null ? List.of() : request.features());
        if (request.specifications() != null) {
            car.setEngine(request.specifications().engine());
            car.setPower(request.specifications().power());
            car.setTorque(request.specifications().torque());
            car.setSeats(request.specifications().seats());
        }
    }
}
