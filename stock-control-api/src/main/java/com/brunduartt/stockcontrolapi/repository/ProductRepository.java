package com.brunduartt.stockcontrolapi.repository;

import com.brunduartt.stockcontrolapi.domain.Product;
import org.springframework.stereotype.Repository;

/**
 * Spring repository for {@link Product} entity
 */
@Repository
public interface ProductRepository extends EntityRepository<Product> {

}
