package com.brunduartt.stockcontrolapi.resource;

import com.brunduartt.stockcontrolapi.criteria.ProductCriteria;
import com.brunduartt.stockcontrolapi.domain.dto.ProductDTO;
import com.brunduartt.stockcontrolapi.service.ProductService;
import com.brunduartt.stockcontrolapi.util.RequestUtils;
import javassist.tools.web.BadHttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for {@link com.brunduartt.stockcontrolapi.domain.Product}
 */
@RestController
@RequestMapping("/api/product")
public class ProductResource {

    private static final String ENTITY_NAME = "PRODUCT";

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private final ProductService productService;

    public ProductResource(ProductService productService) {
        this.productService = productService;
    }

    /**
     * POST - Creates a new product
     * @param productDTO ProductDTO to create
     * @return Created ProductDTO
     * @throws URISyntaxException URI invalid
     */
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) throws URISyntaxException {
        log.debug("REST request to create new Product: {}", productDTO);
        if(productDTO.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New Product can't have an id");
        }
        ProductDTO newEntity = productService.save(productDTO);
        return ResponseEntity.created(new URI("/api/product/"+newEntity.getId())).body(newEntity);
    }

    /**
     * PUT - Updates an already existing Product
     * @param productDTO ProductDTO to update
     * @return Updated ProductDTO
     */
    @PutMapping
    public ResponseEntity<ProductDTO> updateProduct(@Valid @RequestBody ProductDTO productDTO) {
        log.debug("REST request to create new Product: {}", productDTO);
        if(productDTO.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Updated product has null ID");
        } else if(productService.findById(productDTO.getId()).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Can't find product with id: " + productDTO.getId());
        }
        ProductDTO newEntity = productService.save(productDTO);
        return ResponseEntity.ok().body(newEntity);
    }


    /**
     * GET - Get list of products
     * @param pageable Pagination
     * @param criteria Criteria the product should match
     * @return List containing requested products
     */
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts(ProductCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Product by criteria: {}", criteria);
        Page<ProductDTO> page = productService.findByCriteria(criteria, pageable);
        HttpHeaders headers = RequestUtils.createPageHeaders(page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET /id - Retrieves a product by it's ID
     * @param id Id of the product
     * @return DTO of the product with the id
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product by id: {}", id);
        Optional<ProductDTO> product = productService.findById(id);
        return RequestUtils.createResponseOptional(product);
    }

    /**
     * GET /id - Retrieves a product by it's ID
     * @param id Id of the product
     * @return DTO of the product with the id
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product by id: {}", id);
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
