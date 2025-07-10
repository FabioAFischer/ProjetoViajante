import React from 'react';
import { Link } from 'react-router-dom';
import './CadLogForm.css';

const CadLogForm = ({
    titulo,
    onSubmit,
    campos,
    botaoTexto,
    linkTexto,
    linkTo,
    linkMensagem,
    containerClass,
    formGroupClass,
    buttonClass
}) => {
    return (

        <div className="page-wrapper">

            <div className='imagem'>
                <Link to="/"><img src="/travel.png" alt="Logo" /></Link>
            </div>

            <div className={containerClass}>
                <h2>{titulo}</h2>
                <form onSubmit={onSubmit}>
                    {campos.map(({ label, type, value, onChange, placeholder }, index) => (
                        <div className={formGroupClass} key={index}>
                            <label>{label}</label>
                            <input
                                type={type}
                                value={value}
                                onChange={onChange}
                                required
                                placeholder={placeholder}
                            />
                        </div>
                    ))}
                    <button type="submit" className={buttonClass}>{botaoTexto}</button>
                </form>

                {linkMensagem && linkTo && (
                    <p className={`${formGroupClass}-link`} style={{ marginTop: '1rem' }}>
                        {linkMensagem}{' '}
                        <Link to={linkTo}>{linkTexto}</Link>
                    </p>
                )}
            </div>
        </div>

    );
};

export default CadLogForm;
