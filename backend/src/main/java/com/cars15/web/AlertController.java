package com.cars15.web;

import com.cars15.domain.PriceAlert;
import com.cars15.dto.ApiDtos.*;
import com.cars15.repository.CarRepository;
import com.cars15.repository.PriceAlertRepository;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {
    private final PriceAlertRepository priceAlertRepository;
    private final CarRepository carRepository;
    private final CurrentUser currentUser;

    public AlertController(
            PriceAlertRepository priceAlertRepository,
            CarRepository carRepository,
            CurrentUser currentUser) {
        this.priceAlertRepository = priceAlertRepository;
        this.carRepository = carRepository;
        this.currentUser = currentUser;
    }

    @PostMapping
    public AlertResponse create(@Valid @RequestBody AlertRequest request, Authentication authentication) {
        var car = carRepository.findById(request.carId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
        PriceAlert alert = new PriceAlert();
        alert.setCar(car);
        alert.setEmail(request.email());
        alert.setTargetPrice(request.targetPrice());
        if (authentication != null && authentication.getPrincipal() instanceof com.cars15.domain.AppUser user) {
            alert.setUser(user);
        }
        return AlertResponse.from(priceAlertRepository.save(alert));
    }

    @GetMapping
    public List<AlertResponse> all() {
        return priceAlertRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(AlertResponse::from)
                .toList();
    }

    @GetMapping("/me")
    public List<AlertResponse> mine(Authentication authentication) {
        var user = currentUser.require(authentication);
        return priceAlertRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(AlertResponse::from)
                .toList();
    }
}
