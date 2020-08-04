import React from 'react';

import './style.css';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

function TeacherItem() {
    return(
        <article className="teacher-item">
            <header>
                <img src="https://media-exp1.licdn.com/dms/image/C5603AQF-zKJsZL2afg/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=FVx9YKBDWIY3xWSUmh6omsjScBfSct_rBB0gSdCYfRQ" alt="Foto do professor" />
                <div>
                    <strong>Fabiano Lages</strong>
                    <span>Informática</span>
                </div>
            </header>

            <p>
                Entusiastas da tecnologia.
                <br /><br />
                Loucos para entrar nesse mundo louco que domina cada vez mais a vida de todos, vamos entrar nessa nova realidade.
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 50,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} title="Whatsapp" alt="Imagem entrar em contato" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;