package com.cars15.web;

import com.cars15.domain.TestDriveBooking;
import com.cars15.dto.ApiDtos.*;
import com.cars15.repository.BookingRepository;
import com.cars15.repository.CarRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final CurrentUser currentUser;

    public BookingController(
            BookingRepository bookingRepository,
            CarRepository carRepository,
            CurrentUser currentUser) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
        this.currentUser = currentUser;
    }

    @PostMapping
    public BookingResponse create(
            @Valid @RequestBody BookingRequest request,
            Authentication authentication) {
        var car = carRepository.findById(request.carId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

        TestDriveBooking booking = new TestDriveBooking();
        booking.setCar(car);
        booking.setName(request.name());
        booking.setPhone(request.phone());
        booking.setPreferredDate(request.preferredDate());
        if (authentication != null && authentication.getPrincipal() instanceof com.cars15.domain.AppUser user) {
            booking.setUser(user);
        }
        car.setBookings(car.getBookings() + 1);
        carRepository.save(car);
        return BookingResponse.from(bookingRepository.save(booking));
    }

    @GetMapping("/me")
    public List<BookingResponse> mine(Authentication authentication) {
        var user = currentUser.require(authentication);
        return bookingRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(BookingResponse::from)
                .toList();
    }
}
