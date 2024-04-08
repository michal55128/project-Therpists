import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategory } from "../Redux/CategorySlice";
import TherpistCard from './TherpistsCard';
import '../Css/Home.css';

const CategoryTherpists = () => {


    const categories = useSelector(state => state.categories.category);
    const status = useSelector(state => state.categories.category);
    
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [ok, setOk] = useState(false);
    const [message, setMessage] = useState(false);
    const [categoriesSearch, setCategoriesSearch] = useState([]);
    const textRef = useRef('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('in useeffect');
        if (status !== 'fulfilled') {
            dispatch(fetchCategory())
                .then((res) => {
                    if (res.payload)
                        console.log(res.payload);
                })
                .catch(() => {
                    alert("לא עובד");
                })
            console.log(categories);
            console.log(status);
        }

        console.log(status);
    }, [])

    const search = () => {
        // debugger
        let valueSearch = textRef.current.value;
        console.log(textRef.current.value);
        if (valueSearch && categories) {
            setCategoriesSearch(categories.filter((cate) => cate.nameCategory.includes(valueSearch)));
            if (categoriesSearch.length == 0) {
                setOk(false);
                setMessage(true);
            }
            else {
                console.log(setCategoriesSearch);
                setOk(true);
                setMessage(false);
            }
        }
        else {
            setCategoriesSearch([]);
            setOk(false);
        }

    }
    useEffect(() => {
        if (!textRef) {
            setOk(false);
            setCategoriesSearch([]);
        }
    }, [textRef]);

    return (
        <>
            <div> <br/><br/></div>
            <div className="divAll">
                <button className="search-button" onClick={() => search()}>חיפוש</button>
                <input type="text" ref={textRef} className="input" onChange={() => search()} placeholder="חיפוש לפי קטגוריה..." />
            </div>

            <button className="search-button-all" onClick={() => navigate('/AllTherpistFilter')}>לכל המטפלים שלנו </button>

            <div></div>
            <br />
            {message && <div>אין תוצאות תואמות לחיפוש שלך</div>}
            {!ok && categories && categories.map((category, index) => {
                return (

                    <div key={category.id}> {console.log()}

                        <h2 style={{ color: '#6c757d', fontFamily: 'revert', fontSize: '40px' }}>{category.nameCategory}</h2>
                        <TherpistCard therapists={category.therpists} />
                    </div>
                )
            })}
            {ok && categoriesSearch && categoriesSearch.map((category, index) => {
                return (

                    <div key={category.id}> {console.log()}

                        <h2 style={{ color: '#6c757d', fontFamily: 'revert', fontSize: '40px' }}>{category.nameCategory}</h2>
                        <TherpistCard therapists={category.therpists} />
                    </div>
                )
            })}
        </>
    )
}

export default CategoryTherpists;