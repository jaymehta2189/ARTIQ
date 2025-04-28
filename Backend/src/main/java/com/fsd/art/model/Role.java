package com.fsd.art.model;

public enum Role {
    ARTIST("artist"),
    USER("user");

    private final String role;

    Role(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return this.role;
    }

    public static Role fromString(String role) {
        for (Role r : Role.values()) {
            if (r.role.equalsIgnoreCase(role)) {
                return r;
            }
        }
        throw new IllegalArgumentException("Invalid role: %s".formatted(role));
    }
}
