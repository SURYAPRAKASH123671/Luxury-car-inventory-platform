package com.cars15.repository;

import com.cars15.domain.AppUser;
import com.cars15.domain.Car;
import com.cars15.domain.WishlistItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUserOrderByIdDesc(AppUser user);
    Optional<WishlistItem> findByUserAndCar(AppUser user, Car car);
    void deleteByUserAndCar(AppUser user, Car car);
}
