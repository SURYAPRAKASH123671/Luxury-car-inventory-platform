package com.cars15.config;

import com.cars15.domain.AppUser;
import com.cars15.domain.Car;
import com.cars15.domain.UserRole;
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
            boolean shouldRefreshDemoCars =
                    carRepository.count() == 0
                            || !carRepository.existsById("21")
                            || !carRepository.findByBrandIgnoreCase("BMW").isEmpty();
            if (shouldRefreshDemoCars) {
                carRepository.deleteAll();
                List.of(
                        car("1", "Maruti Suzuki", "Alto K10", "VXI Plus", 2021, 32000, "Manual", "Petrol", "Hatchback", "Chennai", 2150, 58, "390000", "1.0L K-Series Petrol", "66 HP", "89 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Maruti_Suzuki_Alto_K10.jpg/1200px-Maruti_Suzuki_Alto_K10.jpg", List.of("Low running cost", "Compact city size", "Power steering", "Dual airbags", "Maruti service network")),
                        car("2", "Maruti Suzuki", "Wagon R", "VXI(O)", 2020, 41000, "Manual", "Petrol", "Hatchback", "Madurai", 1980, 44, "480000", "1.2L Petrol", "82 HP", "113 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/2020_Maruti_Suzuki_Wagon_R_VXi_%28O%29_%28India%29_front_view.png/1200px-2020_Maruti_Suzuki_Wagon_R_VXi_%28O%29_%28India%29_front_view.png", List.of("Tall-boy cabin", "Rear parking sensors", "Dual airbags", "Fuel efficient", "Easy resale")),
                        car("3", "Maruti Suzuki", "Swift", "ZXI Plus AMT", 2021, 38000, "AMT", "Petrol", "Hatchback", "Coimbatore", 2610, 63, "720000", "1.2L Petrol", "89 HP", "113 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Maruti_Suzuki_Swift_2092.JPG/1200px-Maruti_Suzuki_Swift_2092.JPG", List.of("AMT", "Touchscreen", "Rear camera", "LED DRLs", "Great mileage")),
                        car("4", "Maruti Suzuki", "Baleno", "Alpha", 2022, 24000, "Manual", "Petrol", "Hatchback", "Bengaluru", 2340, 47, "860000", "1.2L Petrol", "89 HP", "113 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg/1200px-2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view.jpg", List.of("360 camera", "HUD", "LED projector lamps", "SmartPlay Pro", "6 airbags")),
                        car("5", "Hyundai", "i20", "Asta(O) Diesel", 2021, 36000, "Manual", "Diesel", "Hatchback", "Salem", 1760, 32, "930000", "1.5L Diesel", "99 HP", "240 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/2021_Hyundai_i20_N_Line_%28BI3%3B_India%29_front_view.png/1200px-2021_Hyundai_i20_N_Line_%28BI3%3B_India%29_front_view.png", List.of("Sunroof", "Bose audio", "Cruise control", "Connected tech", "Premium cabin")),
                        car("6", "Maruti Suzuki", "Dzire", "VXI VVT", 2020, 45000, "Manual", "Petrol", "Sedan", "Trichy", 2290, 51, "680000", "1.2L Petrol", "82 HP", "113 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Maruti_Suzuki_Dzire_VXi_VVT.JPG/1200px-Maruti_Suzuki_Dzire_VXi_VVT.JPG", List.of("Large boot", "Rear AC vents", "Dual airbags", "ABS", "High mileage")),
                        car("7", "Honda", "Amaze", "VX CVT", 2021, 29000, "Automatic", "Petrol", "Sedan", "Chennai", 1510, 28, "820000", "1.2L Petrol", "89 HP", "110 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Honda_Amaze_VX_India.jpg/1200px-Honda_Amaze_VX_India.jpg", List.of("CVT automatic", "Rear camera", "Paddle shifters", "Spacious boot", "Honda reliability")),
                        car("8", "Honda", "City", "ZX i-VTEC CVT", 2022, 26000, "Automatic", "Petrol", "Sedan", "Kochi", 2190, 39, "1380000", "1.5L Petrol", "119 HP", "145 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/2022_Honda_City_ZX_i-VTEC_%28India%29_front_view.jpg/1200px-2022_Honda_City_ZX_i-VTEC_%28India%29_front_view.jpg", List.of("LaneWatch camera", "Sunroof", "LED headlamps", "CVT", "Connected car tech")),
                        car("9", "Hyundai", "Verna", "SX(O) Diesel", 2020, 42000, "Manual", "Diesel", "Sedan", "Pune", 1640, 25, "1150000", "1.5L Diesel", "113 HP", "250 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2020_Hyundai_Verna_SX%28O%29_1.5_Diesel_front_view_%28India%29.png/1200px-2020_Hyundai_Verna_SX%28O%29_1.5_Diesel_front_view_%28India%29.png", List.of("Ventilated seats", "Sunroof", "Wireless charging", "BlueLink", "Strong diesel torque")),
                        car("10", "Maruti Suzuki", "Ciaz", "Alpha", 2019, 52000, "Manual", "Petrol", "Sedan", "Delhi NCR", 1210, 18, "890000", "1.5L Petrol Hybrid", "103 HP", "138 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Maruti_Ciaz_2017.jpg/1200px-Maruti_Ciaz_2017.jpg", List.of("Smart hybrid", "Spacious rear seat", "Leatherette seats", "Touchscreen", "Large boot")),
                        car("11", "Renault", "Duster", "RXZ 1.3 Turbo CVT", 2020, 48000, "Automatic", "Petrol", "SUV", "Coimbatore", 1880, 31, "990000", "1.3L Turbo Petrol", "154 HP", "254 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2020_Renault_Duster_RXZ_1.3_Turbo_CVT_%28India%29_front_view.png/1200px-2020_Renault_Duster_RXZ_1.3_Turbo_CVT_%28India%29_front_view.png", List.of("Turbo petrol", "CVT", "Hill start assist", "High ground clearance", "Tough suspension")),
                        car("12", "Hyundai", "Creta", "SX(O) CRDi", 2021, 31000, "Automatic", "Diesel", "SUV", "Bengaluru", 2940, 56, "1720000", "1.5L Diesel", "113 HP", "250 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/2021_Hyundai_Creta_SX%28O%29_CRDi_%28India%29_front_view.jpg/1200px-2021_Hyundai_Creta_SX%28O%29_CRDi_%28India%29_front_view.jpg", List.of("Panoramic sunroof", "Ventilated seats", "Bose audio", "Connected tech", "Air purifier")),
                        car("13", "Tata", "Nexon EV", "XZ Plus Lux", 2022, 22000, "Automatic", "Electric", "SUV", "Hyderabad", 2320, 36, "1290000", "Permanent Magnet Motor", "127 HP", "245 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/2020_Tata_Nexon_EV_%28India%29_front_view.png/1200px-2020_Tata_Nexon_EV_%28India%29_front_view.png", List.of("EV drivetrain", "Sunroof", "Fast charging", "Connected tech", "Low running cost")),
                        car("14", "Maruti Suzuki", "Brezza", "ZXI Plus", 2022, 21000, "Manual", "Petrol", "SUV", "Madurai", 2070, 34, "1120000", "1.5L Petrol", "102 HP", "137 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/2022_Maruti_Suzuki_Brezza_ZXi%2B_%28India%29_front_view_04.png/1200px-2022_Maruti_Suzuki_Brezza_ZXi%2B_%28India%29_front_view_04.png", List.of("Sunroof", "360 camera", "HUD", "6 airbags", "Maruti service support")),
                        car("15", "Kia", "Seltos", "HTX Plus", 2024, 9000, "Automatic", "Diesel", "SUV", "Chennai", 2460, 41, "1890000", "1.5L Diesel", "114 HP", "250 Nm", 5, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kia_Seltos_2024.jpg/1200px-Kia_Seltos_2024.jpg", List.of("ADAS", "Panoramic display", "Ventilated seats", "Bose audio", "Connected car tech")),
                        car("16", "Mahindra", "Thar", "LX 4x4 Hard Top", 2021, 30000, "Manual", "Diesel", "SUV", "Salem", 3020, 49, "1650000", "2.2L Diesel", "130 HP", "300 Nm", 4, "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_02.jpg/1200px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_02.jpg", List.of("4x4", "Hard top", "Adventure tyres", "Hill descent", "Touchscreen")),
                        car("17", "Toyota", "Fortuner", "4x4 AT Legender", 2022, 32000, "Automatic", "Diesel", "SUV", "Kochi", 2790, 36, "4200000", "2.8L Diesel", "201 HP", "500 Nm", 7, "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Toyota_Fortuner_India.jpg/1200px-Toyota_Fortuner_India.jpg", List.of("4x4", "Ventilated seats", "7 seats", "Hill descent", "Toyota reliability")),
                        car("18", "Maruti Suzuki", "Ertiga", "ZXI Plus", 2021, 44000, "Manual", "Petrol", "MPV", "Trichy", 2420, 62, "980000", "1.5L Petrol", "103 HP", "138 Nm", 7, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Maruti_Suzuki_Ertiga%281%29.jpg/1200px-Maruti_Suzuki_Ertiga%281%29.jpg", List.of("7 seats", "Rear AC", "Smart hybrid", "Touchscreen", "Family-friendly cabin")),
                        car("19", "Toyota", "Innova Crysta", "2.4 ZX AT", 2020, 68000, "Automatic", "Diesel", "MPV", "Madurai", 2540, 52, "2250000", "2.4L Diesel", "148 HP", "360 Nm", 7, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Innova_Crysta_2.4_Z_side.jpg/1200px-Toyota_Innova_Crysta_2.4_Z_side.jpg", List.of("Captain seats", "Rear AC", "Toyota service history", "7 seats", "High resale")),
                        car("20", "Kia", "Carens", "Luxury Plus", 2024, 12000, "Automatic", "Diesel", "MPV", "Hyderabad", 1810, 29, "1880000", "1.5L Diesel", "114 HP", "250 Nm", 7, "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Kia_Carens_2024_Model.jpg/1200px-Kia_Carens_2024_Model.jpg", List.of("6 airbags", "Captain seats", "Rear AC vents", "Connected tech", "Sunroof")),
                        car("21", "Renault", "Triber", "RXZ", 2021, 35000, "Manual", "Petrol", "MPV", "Puducherry", 1360, 23, "690000", "1.0L Petrol", "71 HP", "96 Nm", 7, "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Renault_Triber_%283%29.jpg/1200px-Renault_Triber_%283%29.jpg", List.of("Modular 7 seats", "Roof rails", "Touchscreen", "Rear AC vents", "Compact footprint")))
                        .forEach(carRepository::save);
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
            int seats,
            String image,
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
        car.setImage(image);
        car.setImages(List.of(image));
        car.setDescription("Verified Indian used car with inspection history, finance support, and ownership documents ready for review.");
        car.setEngine(engine);
        car.setPower(power);
        car.setTorque(torque);
        car.setSeats(seats);
        car.setFeatures(features);
        return car;
    }
}
