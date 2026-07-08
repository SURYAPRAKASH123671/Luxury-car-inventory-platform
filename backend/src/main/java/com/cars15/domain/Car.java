package com.cars15.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    private String id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String variant;

    @Column(name = "model_year")
    private int year;
    private int mileage;
    private String transmission;
    private String fuelType;
    private String bodyType;
    private String location;
    private int views;
    private int bookings;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal price;

    @Column(length = 1000)
    private String image;

    @Column(length = 1500)
    private String description;

    private String engine;
    private String power;
    private String torque;
    private Integer seats;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "car_features", joinColumns = @JoinColumn(name = "car_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "car_images", joinColumns = @JoinColumn(name = "car_id"))
    @Column(name = "image_url", length = 1000)
    private List<String> images = new ArrayList<>();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getVariant() { return variant; }
    public void setVariant(String variant) { this.variant = variant; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public int getMileage() { return mileage; }
    public void setMileage(int mileage) { this.mileage = mileage; }
    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }
    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }
    public String getBodyType() { return bodyType; }
    public void setBodyType(String bodyType) { this.bodyType = bodyType; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public int getViews() { return views; }
    public void setViews(int views) { this.views = views; }
    public int getBookings() { return bookings; }
    public void setBookings(int bookings) { this.bookings = bookings; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getEngine() { return engine; }
    public void setEngine(String engine) { this.engine = engine; }
    public String getPower() { return power; }
    public void setPower(String power) { this.power = power; }
    public String getTorque() { return torque; }
    public void setTorque(String torque) { this.torque = torque; }
    public Integer getSeats() { return seats; }
    public void setSeats(Integer seats) { this.seats = seats; }
    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
}
