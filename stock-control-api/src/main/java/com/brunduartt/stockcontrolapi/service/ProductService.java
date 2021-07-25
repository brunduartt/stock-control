package com.brunduartt.stockcontrolapi.service;

import com.brunduartt.stockcontrolapi.domain.Product;
import com.brunduartt.stockcontrolapi.domain.Product_;
import com.brunduartt.stockcontrolapi.domain.criteria.ProductCriteria;
import com.brunduartt.stockcontrolapi.domain.dto.ProductDTO;
import com.brunduartt.stockcontrolapi.domain.mapper.ProductMapper;
import com.brunduartt.stockcontrolapi.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * {@link Product} Service
 */
@Service
@Transactional
public class ProductService extends EntityService<Product, ProductDTO, ProductMapper, ProductRepository> {

    public ProductService(
            ProductRepository productRepository,
            ProductMapper mapper
    ) {
        super(productRepository, mapper, Product.class);
    }

    public Page<ProductDTO> findByCriteria(ProductCriteria criteria, Pageable pageable) {
        Specification<Product> specification = Specification.where(null);
        if(criteria != null) {
            if(criteria.getName() != null && !criteria.getName().isEmpty()) {
                specification = specification.and(
                        likeUpperSpecification(productRoot -> productRoot.get(Product_.name), criteria.getName())
                );
            }
            if(criteria.getId() != null) {
                specification = specification.and((
                        (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get(Product_.id), criteria.getId())
                ));
            }
        }
        return super.findAll(specification, pageable);
    }

}
