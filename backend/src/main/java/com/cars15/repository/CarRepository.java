package com.cars15.repository;

import com.cars15.domain.Car;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, String> {
    List<Car> findByBrandIgnoreCase(String brand);
}
