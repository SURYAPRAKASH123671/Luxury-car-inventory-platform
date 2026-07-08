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
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BMW_3_SERIES_SEDAN_%28G20%29_China.jpg/1280px-BMW_3_SERIES_SEDAN_%28G20%29_China.jpg",
                        List.of("M Sport package", "Sunroof", "Digital cockpit", "Reverse camera", "6 airbags")));
                carRepository.save(car(
                        "2", "BMW", "5 Series", "530d Luxury Line", 2020, 35000,
                        "Automatic", "Diesel", "Sedan", "Chennai", 2210, 24,
                        "6500000", "3.0L Turbo Diesel", "265 HP", "620 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/BMW_5_SERIES_%28G30%29_HONG_KONG.jpg/1280px-BMW_5_SERIES_%28G30%29_HONG_KONG.jpg",
                        List.of("Panoramic sunroof", "Leather seats", "Gesture control", "Ambient lighting", "Adaptive suspension")));
                carRepository.save(car(
                        "3", "Jaguar", "XF", "Portfolio 25t", 2022, 18000,
                        "Automatic", "Petrol", "Sedan", "Coimbatore", 1650, 15,
                        "5500000", "2.0L Turbo Petrol", "247 HP", "365 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jaguar_XF_%28X260%29_1999cc_diesel_registered_November_2015.JPG/1280px-Jaguar_XF_%28X260%29_1999cc_diesel_registered_November_2015.JPG",
                        List.of("Meridian audio", "Memory seats", "Lane assist", "Touch Pro Duo", "Extended warranty")));
                carRepository.save(car(
                        "4", "Mini", "Cooper S", "JCW Edition", 2021, 22000,
                        "Automatic", "Petrol", "Hatchback", "Bengaluru", 1320, 12,
                        "3800000", "2.0L Turbo Petrol", "192 HP", "280 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/MINI_F56_Hatch_Cooper_S_Chili_Red_%282%29.jpg/1280px-MINI_F56_Hatch_Cooper_S_Chili_Red_%282%29.jpg",
                        List.of("JCW body kit", "Sport seats", "Harman Kardon audio", "Paddle shifters", "LED headlamps")));
                carRepository.save(car(
                        "5", "Rolls-Royce", "Ghost", "Series II", 2020, 15000,
                        "Automatic", "Petrol", "Sedan", "Hyderabad", 3090, 9,
                        "150000000", "6.6L Twin-Turbo V12", "563 HP", "780 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Rolls-Royce_Ghost_I_Series_II_Black_%2811%29.jpg/1280px-Rolls-Royce_Ghost_I_Series_II_Black_%2811%29.jpg",
                        List.of("Starlight headliner", "Bespoke cabin", "Rear-seat theatre", "Soft-close doors", "V12 refinement")));
                carRepository.save(car(
                        "6", "Mercedes-Benz", "E-Class", "E 220d Exclusive", 2021, 28000,
                        "Automatic", "Diesel", "Sedan", "Delhi NCR", 2420, 28,
                        "5900000", "2.0L Diesel", "194 HP", "400 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/MERCEDES-BENZ_E-CLASS_%28W213%29_China.jpg/1280px-MERCEDES-BENZ_E-CLASS_%28W213%29_China.jpg",
                        List.of("Burmester audio", "Widescreen cockpit", "Rear recline", "Ambient lighting", "ADAS")));
                carRepository.save(car(
                        "7", "Audi", "Q7", "55 TFSI Technology", 2022, 19000,
                        "Automatic", "Petrol", "SUV", "Mumbai", 2010, 21,
                        "8400000", "3.0L Turbo Petrol", "335 HP", "500 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2025_Audi_Q7_%284M%29_DSC_7473.jpg/1280px-2025_Audi_Q7_%284M%29_DSC_7473.jpg",
                        List.of("Quattro AWD", "7 seats", "Virtual cockpit", "Matrix LED", "Air suspension")));
                carRepository.save(car(
                        "8", "Toyota", "Fortuner", "4x4 AT Legender", 2022, 32000,
                        "Automatic", "Diesel", "SUV", "Kochi", 2790, 36,
                        "4200000", "2.8L Diesel", "201 HP", "500 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Toyota_Fortuner_India.jpg/1280px-Toyota_Fortuner_India.jpg",
                        List.of("4x4", "Ventilated seats", "7 seats", "Hill descent", "Toyota reliability")));
                carRepository.save(car(
                        "9", "Maruti Suzuki", "Swift", "ZXI Plus AMT", 2021, 41000,
                        "AMT", "Petrol", "Hatchback", "Chennai", 1880, 44,
                        "720000", "1.2L Petrol", "89 HP", "113 Nm",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Maruti_Suzuki_Swift_2092.JPG/1280px-Maruti_Suzuki_Swift_2092.JPG",
                        List.of("AMT", "Touchscreen", "Dual airbags", "Rear camera", "Great mileage")));
                carRepository.save(car(
                        "10", "Hyundai", "Creta", "SX(O) Turbo DCT", 2022, 26000,
                        "Automatic", "Petrol", "SUV", "Bengaluru", 2630, 39,
                        "1740000", "1.4L Turbo Petrol", "138 HP", "242 Nm",
                        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
                        List.of("Panoramic sunroof", "Ventilated seats", "DCT", "Connected car tech", "Bose audio")));
                carRepository.save(car(
                        "11", "Tata", "Nexon EV", "XZ Plus Lux", 2022, 24000,
                        "Automatic", "Electric", "SUV", "Pune", 2190, 31,
                        "1290000", "Permanent Magnet Motor", "127 HP", "245 Nm",
                        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
                        List.of("Electric drivetrain", "Sunroof", "Connected tech", "Fast charging", "Low running cost")));
                carRepository.save(car(
                        "12", "Kia", "Carnival", "Limousine Plus", 2021, 38000,
                        "Automatic", "Diesel", "MPV", "Hyderabad", 1470, 19,
                        "3250000", "2.2L Diesel", "197 HP", "440 Nm",
                        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80",
                        List.of("Captain seats", "Powered doors", "Tri-zone AC", "Rear entertainment", "7 seats")));
                carRepository.save(car(
                        "13", "Toyota", "Innova Crysta", "2.4 ZX AT", 2020, 68000,
                        "Automatic", "Diesel", "MPV", "Madurai", 2540, 52,
                        "2250000", "2.4L Diesel", "148 HP", "360 Nm",
                        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80",
                        List.of("Captain seats", "Rear AC", "Toyota service", "7 seats", "High resale")));
                carRepository.save(car(
                        "14", "Mahindra", "Thar", "LX 4x4 Hard Top", 2021, 30000,
                        "Manual", "Diesel", "Off-Roader", "Coimbatore", 3010, 47,
                        "1650000", "2.2L Diesel", "130 HP", "300 Nm",
                        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
                        List.of("4x4", "Hard top", "All-terrain tyres", "Touchscreen", "Adventure ready")));
                carRepository.save(car(
                        "15", "Force", "Traveller", "3350 Super", 2019, 95000,
                        "Manual", "Diesel", "Van", "Salem", 980, 11,
                        "1450000", "2.6L Diesel", "90 HP", "250 Nm",
                        "https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=1200&q=80",
                        List.of("12 seats", "High roof", "Rear AC", "Fleet ready", "Diesel economy")));
                carRepository.save(car(
                        "16", "Mercedes-Benz", "V-Class", "Expression", 2020, 42000,
                        "Automatic", "Diesel", "Luxury Van", "Mumbai", 1190, 13,
                        "7200000", "2.1L Diesel", "161 HP", "380 Nm",
                        "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1200&q=80",
                        List.of("Captain seats", "Sliding doors", "Ambient lighting", "Rear AC", "Executive cabin")));
                carRepository.save(car(
                        "17", "Land Rover", "Range Rover Evoque", "R-Dynamic SE", 2021, 27000,
                        "Automatic", "Diesel", "SUV", "Delhi NCR", 1740, 17,
                        "6100000", "2.0L Diesel", "201 HP", "430 Nm",
                        "https://images.unsplash.com/photo-1539799139339-50c5fe1e2b1b?w=1200&q=80",
                        List.of("Terrain response", "Panoramic roof", "Meridian audio", "Digital cluster", "AWD")));
                carRepository.save(car(
                        "18", "Porsche", "Cayenne", "Base", 2019, 33000,
                        "Automatic", "Petrol", "SUV", "Bengaluru", 2110, 14,
                        "8900000", "3.0L Turbo Petrol", "335 HP", "450 Nm",
                        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
                        List.of("Sport Chrono", "Air suspension", "BOSE audio", "AWD", "Performance brakes")));
                carRepository.save(car(
                        "19", "Honda", "City", "ZX CVT", 2021, 36000,
                        "Automatic", "Petrol", "Sedan", "Trichy", 1380, 29,
                        "1220000", "1.5L Petrol", "119 HP", "145 Nm",
                        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
                        List.of("CVT", "Sunroof", "Lane watch", "LED headlamps", "Rear camera")));
                carRepository.save(car(
                        "20", "Toyota", "Hilux", "High 4x4 AT", 2023, 14000,
                        "Automatic", "Diesel", "Pickup", "Jaipur", 1040, 10,
                        "3650000", "2.8L Diesel", "201 HP", "500 Nm",
                        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
                        List.of("4x4", "Load bed", "Hill assist", "Diesel torque", "Adventure utility")));
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
        car.setDescription("Certified pre-owned luxury vehicle with verified documentation, inspection history, and finance support.");
        car.setEngine(engine);
        car.setPower(power);
        car.setTorque(torque);
        car.setSeats(5);
        car.setFeatures(features);
        return car;
    }
}
