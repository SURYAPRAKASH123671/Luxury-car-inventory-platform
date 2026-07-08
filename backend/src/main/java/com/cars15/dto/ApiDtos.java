package com.cars15.dto;

import com.cars15.domain.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public final class ApiDtos {
    private ApiDtos() {}

    public record RegisterRequest(
            @NotBlank String name,
            @Email @NotBlank String email,
            @NotBlank String phone,
            @Size(min = 6) String password) {}

    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}

    public record AuthResponse(String token, UserResponse user) {}

    public record UserResponse(Long id, String name, String email, String phone, UserRole role) {
        public static UserResponse from(AppUser user) {
            return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getPhone(), user.getRole());
        }
    }

    public record CarResponse(
            String id,
            String brand,
            String model,
            String variant,
            int year,
            int mileage,
            String transmission,
            String fuelType,
            String bodyType,
            String location,
            int views,
            int bookings,
            BigDecimal price,
            String image,
            List<String> images,
            String description,
            List<String> features,
            Specifications specifications) {
        public static CarResponse from(Car car) {
            return new CarResponse(
                    car.getId(),
                    car.getBrand(),
                    car.getModel(),
                    car.getVariant(),
                    car.getYear(),
                    car.getMileage(),
                    car.getTransmission(),
                    car.getFuelType(),
                    car.getBodyType(),
                    car.getLocation(),
                    car.getViews(),
                    car.getBookings(),
                    car.getPrice(),
                    car.getImage(),
                    car.getImages(),
                    car.getDescription(),
                    car.getFeatures(),
                    new Specifications(car.getEngine(), car.getPower(), car.getTorque(), car.getSeats()));
        }
    }

    public record Specifications(String engine, String power, String torque, Integer seats) {}

    public record CarUpsertRequest(
            @NotBlank String id,
            @NotBlank String brand,
            @NotBlank String model,
            @NotBlank String variant,
            @Min(1990) int year,
            @PositiveOrZero int mileage,
            @NotBlank String transmission,
            @NotBlank String fuelType,
            @NotBlank String bodyType,
            @NotBlank String location,
            @Positive BigDecimal price,
            @NotBlank String image,
            List<String> images,
            String description,
            List<String> features,
            Specifications specifications) {}

    public record BookingRequest(
            @NotBlank String carId,
            @NotBlank String name,
            @NotBlank String phone,
            @NotNull LocalDate preferredDate) {}

    public record BookingStatusRequest(@NotNull BookingStatus status) {}

    public record BookingResponse(
            Long id,
            String carId,
            String carName,
            String name,
            String phone,
            LocalDate preferredDate,
            BookingStatus status,
            OffsetDateTime createdAt) {
        public static BookingResponse from(TestDriveBooking booking) {
            Car car = booking.getCar();
            return new BookingResponse(
                    booking.getId(),
                    car.getId(),
                    car.getBrand() + " " + car.getModel(),
                    booking.getName(),
                    booking.getPhone(),
                    booking.getPreferredDate(),
                    booking.getStatus(),
                    booking.getCreatedAt());
        }
    }

    public record AlertRequest(
            @NotBlank String carId,
            @Email @NotBlank String email,
            @NotNull @Positive BigDecimal targetPrice) {}

    public record AlertResponse(
            Long id,
            String carId,
            String carName,
            String email,
            BigDecimal targetPrice,
            boolean active,
            OffsetDateTime createdAt) {
        public static AlertResponse from(PriceAlert alert) {
            Car car = alert.getCar();
            return new AlertResponse(
                    alert.getId(),
                    car.getId(),
                    car.getBrand() + " " + car.getModel(),
                    alert.getEmail(),
                    alert.getTargetPrice(),
                    alert.isActive(),
                    alert.getCreatedAt());
        }
    }

    public record AnalyticsResponse(
            long totalCars,
            long totalBookings,
            long registeredUsers,
            long totalViews,
            List<PopularCar> mostViewed,
            List<BrandDemand> brandDemand) {}

    public record PopularCar(String id, String name, int views, int bookings) {}
    public record BrandDemand(String brand, long cars, long bookings) {}
}
