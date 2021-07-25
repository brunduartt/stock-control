package com.brunduartt.stockcontrolapi.util;

import java.text.Normalizer;

public class StringUtils {
    public static String Unaccent(String src) {
        return Normalizer
                .normalize(src, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "");
    }

}
