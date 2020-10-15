import React from 'react';

function Contact() {

    return (
        <div className="container mx-auto pt-4">
            <div className="grid grid-cols-2">
                <div>
                    <h2 className="text-2xl font-bold">Kontakt</h2>
                    <div className="address py-2">
                        <h3 className="text-xl">Adresa</h3>
                        <p>
                            Brigádnická 218/6
                        </p>
                        <p> 040 11 Košice</p>
                    </div>
                    <div className="information py-2">
                        <p>ICO: 52341020</p>
                        <p>DIC: 2121006261</p>
                    </div>
                    <div className="contact-info">
                        <h3 className="text-xl">Kontaky</h3>
                        <p>
                            <a href="mailto:kontakt@spintegra.sk" className="text-orange-500">kontakt@spintegra.sk</a>
                        </p>
                        <p>
                            <a href="tel:+421948151336" className="text-orange-500">0948 151 336</a>
                        </p>
                    </div>
                </div>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.488337990963!2d21.228021316005325!3d48.71525987927368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ee0474683a2f7%3A0x2f76580eaf2ae4dc!2zQnJpZ8OhZG5pY2vDoSA2LCAwNDAgMTEgS2_FoWljZQ!5e0!3m2!1sen!2ssk!4v1602766094937!5m2!1sen!2ssk"
                        width="100%" frameBorder="0" allowFullScreen="" className="border-0 h-full w-full"
                        aria-hidden="false" tabIndex="0"/>
                </div>
            </div>

        </div>
    )
}


export default Contact
