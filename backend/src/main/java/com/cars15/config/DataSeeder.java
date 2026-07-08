package com.cars15.config;

import com.cars15.domain.*;
import com.cars15.repository.CarRepository;
import com.cars15.repository.UserRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedData(
            CarRepository carRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByEmailIgnoreCase("admin@cars15.local")) {
                AppUser admin = new AppUser();
                admin.setName("Cars 15 Admin");
                admin.setEmail("admin@cars15.local");
                admin.setPhone("+91 91503 57320");
                admin.setPasswordHash(passwordEncoder.encode("admin123"));
                admin.setRole(UserRole.ADMIN);
                userRepository.save(admin);
            }
            if (!userRepository.existsByEmailIgnoreCase("buyer@cars15.local")) {
                AppUser buyer = new AppUser();
                buyer.setName("Demo Buyer");
                buyer.setEmail("buyer@cars15.local");
                buyer.setPhone("+91 90000 12345");
                buyer.setPasswordHash(passwordEncoder.encode("buyer123"));
                buyer.setRole(UserRole.USER);
                userRepository.save(buyer);
            }
            if (carRepository.count() == 0) {
                carRepository.save(car(
                        "1", "BMW", "3 Series", "330i M Sport", 2021, 25000,
                        "Automatic", "Petrol", "Sedan", "Chennai", 1840, 18,
                        "4500000", "2.0L Turbo Petrol", "258 HP", "400 Nm",
                        List.of("M Sport package", "Sunroof", "Digital cockpit", "Reverse camera", "6 airbags")));
                carRepository.save(car(
                        "2", "BMW", "5 Series", "530d Luxury Line", 2020, 35000,
                        "Automatic", "Diesel", "Sedan", "Chennai", 2210, 24,
                        "6500000", "3.0L Turbo Diesel", "265 HP", "620 Nm",
                        List.of("Panoramic sunroof", "Leather seats", "Gesture control", "Ambient lighting", "Adaptive suspension")));
                carRepository.save(car(
                        "3", "Jaguar", "XF", "Portfolio 25t", 2022, 18000,
                        "Automatic", "Petrol", "Sedan", "Coimbatore", 1650, 15,
                        "5500000", "2.0L Turbo Petrol", "247 HP", "365 Nm",
                        List.of("Meridian audio", "Memory seats", "Lane assist", "Touch Pro Duo", "Extended warranty")));
                carRepository.save(car(
                        "4", "Mini", "Cooper S", "JCW Edition", 2021, 22000,
                        "Automatic", "Petrol", "Hatchback", "Bengaluru", 1320, 12,
                        "3800000", "2.0L Turbo Petrol", "192 HP", "280 Nm",
                        List.of("JCW body kit", "Sport seats", "Harman Kardon audio", "Paddle shifters", "LED headlamps")));
                carRepository.save(car(
                        "5", "Rolls-Royce", "Ghost", "Series II", 2020, 15000,
                        "Automatic", "Petrol", "Sedan", "Hyderabad", 3090, 9,
                        "150000000", "6.6L Twin-Turbo V12", "563 HP", "780 Nm",
                        List.of("Starlight headliner", "Bespoke cabin", "Rear-seat theatre", "Soft-close doors", "V12 refinement")));
            }
        };
    }

    private Car car(
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
            String price,
            String engine,
            String power,
            String torque,
            List<String> features) {
        Car car = new Car();
        car.setId(id);
        car.setBrand(brand);
        car.setModel(model);
        car.setVariant(variant);
        car.setYear(year);
        car.setMileage(mileage);
        car.setTransmission(transmission);
        car.setFuelType(fuelType);
        car.setBodyType(bodyType);
        car.setLocation(location);
        car.setViews(views);
        car.setBookings(bookings);
        car.setPrice(new BigDecimal(price));
        car.setImage("https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80");
        car.setImages(List.of(
                "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80",
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
                "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80"));
        car.setDescription("Certified pre-owned luxury vehicle with verified documentation, inspection history, and finance support.");
        car.setEngine(engine);
        car.setPower(power);
        car.setTorque(torque);
        car.setSeats(5);
        car.setFeatures(features);
        return car;
    }
}
