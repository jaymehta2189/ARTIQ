package com.fsd.art.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Email
    private String email;

    @Size(min = 8)
    private String password;

    private Role role;

    @OneToMany(mappedBy = "buyer",fetch = FetchType.LAZY)
    private List<Painting> purchased_Item;

    @OneToMany(mappedBy = "artist",fetch = FetchType.LAZY)
    private List<Painting> sold_Item;

    @ManyToMany
    @JoinTable(
            name = "cart_painting",
            joinColumns = @JoinColumn(name = "cart_id"),
            inverseJoinColumns = @JoinColumn(name = "painting_id")
    )
    private Set<Painting> add_Cart_Item = new HashSet<>();
}
