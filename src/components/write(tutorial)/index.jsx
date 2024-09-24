import { useEffect, useState } from "react"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "../../script/firebase"


export const ProductList = () => {

    const [products, setProducts] = useState([]);
    
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const fetchedProducts = await getProducts();
    //         setProducts(fetchedProducts);
    //     };
    //     fetchProducts();
    // }, []);


    const getProducts = async () => {
        const productsCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollectionRef);
        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return products;
    };

    const getProductById = async (productId) => {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    };

    const addProduct = async (newProduct) => {
        const productsCollectionRef = collection(db, 'products');
        await addDoc(productsCollectionRef, newProduct);
    };

    const updateProduct = async (productId, updatedProduct) => {
        const productDocRef = doc(db, 'products', productId);
        await updateDoc(productDocRef, updatedProduct);
    };

    const deleteProduct = async (productId) => {
        const productDocRef = doc(db, 'products', productId);
        await deleteDoc(productDocRef);
    };


    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    );
}