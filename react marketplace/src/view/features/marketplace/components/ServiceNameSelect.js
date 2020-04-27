import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

const ServiceNameSelect = ({ setId, disabled, className, id }) => {
    const [categories, setCategories] = useState(null);
    const dispatch = useDispatch();
    const [isActiveInput, setIsActiveInput] = useState(false);

    useEffect(() =>{
        dispatch({
            type: 'TEST_CATEGORY',
            meta: {
                callback: ({ payload }) => {
                    setCategories(Object.values(payload));
                },
            },
        });
    }, []);

    return (
        <div className="form-group position-relative">
            <select
                onChange={(e)=> {
                    setId(e.target.value);
                }}
                className={className}
                disabled={disabled}
                onClick={() => setIsActiveInput(!isActiveInput)}
                onBlur={() => setIsActiveInput(false)}
                defaultValue=""
                id={id}
            >
                <option value="" hidden disabled>Select service name</option>
                { categories ? categories.map(data => {
                    return <option key={data.id}
                                   value={data.id}
                                   >
                        { data.name }
                    </option>
                }) : null }

            </select>
            <div className={`arrow ${disabled ? 'arrow--hide' : ''} ${isActiveInput ? 'arrow--active' : ''}`}></div>
        </div>
    );
};

export default ServiceNameSelect;
