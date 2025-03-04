document.getElementById("productForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // prevent refresh

    try {
        const res = await fetch("http://localhost:3000/shoes");
        if (!res.ok) {
            throw new Error("Failed to fetch existing shoes");
        }
        const shoes = await res.json();
        
        // ID
        const newId = shoes.length > 0 ? Math.max(...shoes.map(shoe => shoe.id)) + 1 : 1;

        // Colors to an array
        const colorsInput = document.getElementById("shoeColors").value;
        const colorsArray = colorsInput.split(",").map(color => color.trim());

        // Sizes to an array
        const sizesInput = document.getElementById("shoeSizes").value;
        const sizesArray = sizesInput.split(",").map(size => size.trim());

        const shoeData = {
            id: newId,
            name: document.getElementById("shoeName").value,
            brand: document.getElementById("shoeBrand").value,
            price: document.getElementById("shoePrice").value,
            sizes: sizesArray, 
            colors: colorsArray,
            imageUrl: document.getElementById("shoeImage").value,
            category: document.getElementById("shoeCategory").value,
            href: "productPage.html"
        };

        const response = await fetch("http://localhost:3000/shoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shoeData),
        });

        if (response.ok) {
            alert("Shoe added successfully!");
        } else {
            alert("Failed to add shoe.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error adding shoe.");
    }
});
