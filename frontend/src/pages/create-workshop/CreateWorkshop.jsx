import { useState, useEffect } from "react";
import "./create-post.css"
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";

import { Hourglass } from "react-loader-spinner";
// import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreateWorkshop = () => {

    const dispatch = useDispatch();
    const { loading, isPostCreated } = useSelector(state => state.post);
    // const { categories } = useSelector(state => state.category);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState(null);

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (title.trim() === "") return toast.error("Post Title is required");
        if (category.trim() === "") return toast.error("Post Category is required");
        if (description.trim() === "") return toast.error("Post Description is required");
        if (!file || (file && file.name.trim() === "")) {
            return toast.error("Post Image is required");
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("price", price);


        //Send form data to server
        // console.log({ title, category, description, file });

        dispatch(createPost(formData));

    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isPostCreated) {
            navigate("/");
        }
    }, [isPostCreated, navigate]);

    // useEffect(() => {
    //   dispatch(fetchCategories())
    // },[]);

    return (
        <section className="create-post">
            <h1 className="create-post-title">
                Create New Product
            </h1>
            <form onSubmit={formSubmitHandler} className="create-post-form">

                <input
                    type="text"
                    placeholder="Product Name"
                    className="create-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <input
                    type="number"
                    placeholder="Product Price"
                    className="create-post-input"
                    style={{ width: "50%" }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />

                <select
                    className="create-post-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} >

                    <option disabled value="">
                        Select A Category
                    </option>
                    {/* {categories.map(category =>
            <option key={category._id} value="{category.title}">

              {category.title}
            </option>

          )} */}
                    <option value="music" >music</option>
                    <option value="drama" >drama</option>

                </select>

                <textarea
                    rows="5"
                    placeholder="Product Description"
                    className="create-post-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} >
                </textarea>

                <input
                    type="file"
                    name="file"
                    id="file"
                    className="create-post-upload"
                    onChange={(e) => setFile(e.target.files[0])} />

                <button type="submit" className="create-post-btn">
                    {
                        loading ? (
                            (<Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#306cce', '#72a1ed']}
                            />)
                        ) : "Create"
                    }

                </button>
            </form>
        </section>
    );
};

export default CreateWorkshop;