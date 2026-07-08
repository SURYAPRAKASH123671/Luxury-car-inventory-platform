package com.cars15.web;

import com.cars15.domain.WishlistItem;
import com.cars15.dto.ApiDtos.CarResponse;
import com.cars15.repository.CarRepository;
import com.cars15.repository.WishlistRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistRepository wishlistRepository;
    private final CarRepository carRepository;
    private final CurrentUser currentUser;

    public WishlistController(
            WishlistRepository wishlistRepository,
            CarRepository carRepository,
            CurrentUser currentUser) {
        this.wishlistRepository = wishlistRepository;
        this.carRepository = carRepository;
        this.currentUser = currentUser;
    }

    @GetMapping
    public List<CarResponse> list(Authentication authentication) {
        var user = currentUser.require(authentication);
        return wishlistRepository.findByUserOrderByIdDesc(user)
                .stream()
                .map(item -> CarResponse.from(item.getCar()))
                .toList();
    }

    @PostMapping("/{carId}")
    public List<CarResponse> add(@PathVariable String carId, Authentication authentication) {
        var user = currentUser.require(authentication);
        var car = carRepository.findById(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
        wishlistRepository.findByUserAndCar(user, car).orElseGet(() -> {
            WishlistItem item = new WishlistItem();
            item.setUser(user);
            item.setCar(car);
            return wishlistRepository.save(item);
        });
        return list(authentication);
    }

    @DeleteMapping("/{carId}")
    @Transactional
    public List<CarResponse> remove(@PathVariable String carId, Authentication authentication) {
        var user = currentUser.require(authentication);
        var car = carRepository.findById(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
        wishlistRepository.deleteByUserAndCar(user, car);
        return list(authentication);
    }
}
