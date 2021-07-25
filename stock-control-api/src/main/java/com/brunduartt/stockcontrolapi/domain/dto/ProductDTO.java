package com.brunduartt.stockcontrolapi.domain.dto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * {@link com.brunduartt.stockcontrolapi.domain.Product} DTO
 */
public class ProductDTO implements Serializable {

    private Long id;

    private String name;

    private Long amount;

    private BigDecimal unitValue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public BigDecimal getUnitValue() {
        return unitValue;
    }

    public void setUnitValue(BigDecimal unitValue) {
        this.unitValue = unitValue;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", amount=" + amount +
                ", unitValue=" + unitValue +
                '}';
    }
}
