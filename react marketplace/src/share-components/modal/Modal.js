import React, { useEffect, useState } from 'react';

import './modal.scss';
import EventEmitter from '../../event-emitter/event-emitter';

const Modal = ({ onTransitionEnd, fadeType, time, className = '', show, children }) => {
    const [transition] = useState(`opacity ${time} ${fadeType}`);
    const [isShow, setIsShow] = useState(show);
    const [isShowContent, setIsShowContent] = useState(show);

    useEffect(() => {
        const closeSubscription = EventEmitter.subscribe('modalClose', () => setIsShowContent(false));

        return () => closeSubscription();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsShowContent(show);
        }, 0);
        setIsShow(show);
        if (show) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [show]);

    const handleClose = ({ target }) => {
        if (target === document.getElementById('modal')) {
            setIsShowContent(false);
        }
    };

    const handleTransition = ({ target }) => {
        if (target === document.getElementById('modal')) {
            onTransitionEnd(isShowContent);
        }
    };

    return (
        <div>
            {
                isShow &&
                <div
                    id="modal"
                    className={`modal ${isShowContent ? 'modal--show' : ''}`}
                    style={{
                        transition
                    }}
                    onTransitionEnd={handleTransition}
                    onClick={handleClose}
                >
                    <div className={`m-auto modal__content ${className}`}>
                        <div
                            className="close close--circle"
                            onClick={() => setIsShowContent(false)}
                        ></div>
                        {children}
                    </div>
                </div>
            }
        </div>
    );
};

export default Modal;