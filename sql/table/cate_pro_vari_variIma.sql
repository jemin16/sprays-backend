SELECT 
            c.id AS category_id,
            c.name AS category_name,
            p.id AS product_id,
            p.name AS product_name,
            p.slug,
            p.description,
            p.image AS product_image,
            p.stock,
            p.brand,
            p.custom_label,
            v.id AS variant_id,
            v.color,
            v.weight,
            v.original_price,
            v.discount_price,
            vi.images
        FROM categories c
        JOIN products p ON c.id = p.category_id
        LEFT JOIN variants v ON p.id = v.product_id
        LEFT JOIN variant_images vi ON v.id = vi.variant_id
        WHERE 1=1;