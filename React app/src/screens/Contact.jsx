import React, { useState } from 'react';
import Navbar1 from "../component/Navbar1";
import Sidebar from '../component/Sidebar';
import thankyou from '../Style/Images/thankyou.gif'; 

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        fetch("https://localhost:7104/api/Contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Feedback submitted successfully:", data);
            alert("Thank you for your feedback!");
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
        })
        .catch(error => {
            console.error("Error submitting feedback:", error);
            alert("An error occurred. Please try again.");
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div>
            <Navbar1 />
            <Sidebar />
            <section className="py-3 py-md-5 py-xl-8">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                            <h2 className="mb-4 display-5 text-center">Need Help</h2>
                            <p className="text-secondary mb-5 text-center lead fs-4">Our team is available to provide prompt and helpful responses to all inquiries. You can reach us via phone, email, or by filling out the contact form below.</p>
                            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"/>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {/* Static Information Column */}
                        <div className="col-12 col-lg-6">
                            <div className="card border border-dark rounded shadow-sm overflow-hidden h-100">
                                <div className="card-body p-4">
                                    <h2 className="h4 mb-4">Contact Information</h2>
                                    <div className="d-flex mb-4">
                                        <div className="me-3 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="mb-3">Address</h4>
                                            <address className="mb-0">Anuda Chambers, Shanivar Prth karad</address>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4">
                                        <div className="me-3 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-telephone-outbound" viewBox="0 0 16 16">
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="mb-3">Phone</h4>
                                            <p className="mb-0">
                                                <a className="text-decoration-none">7709176162</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4">
                                        <div className="me-3 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
                                                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9.227 10.432 9.227 12.034v.194c0 1.168.578 2.025 1.587 2.025.58 0 1.015-.237 1.385-.559.351.322.793.559 1.357.559Zm-.707-2.484c-.513 0-.882-.208-1.127-.457-.184.069-.376.13-.573.18-.155.042-.285.113-.408.198-.237.182-.415.418-.515.68-.173.432-.292.862-.292 1.155v.017c0 .053.042.095.093.095.05 0 .093-.042.093-.095v-.018c0-.247.115-.557.291-.823.175-.258.428-.478.715-.662.304-.189.662-.299 1.03-.299.092 0 .183.007.275.017.169.016.336.042.496.08.201.048.396.122.584.208.176.075.348.164.497.283.227.188.376.445.376.689v.017c0 .049-.042.092-.094.092-.05 0-.092-.043-.092-.092v-.017c0-.09-.08-.216-.207-.303-.127-.091-.282-.165-.442-.226-.213-.083-.453-.135-.708-.155-.093-.007-.187-.011-.28-.011Z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="mb-3">Email</h4>
                                            <p className="mb-0">
                                                <a className="text-decoration-none" href="mailto:support@domain.com">support@taskbuddy.com</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-3">Opening Hours</h4>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">Monday - Friday: 8 AM - 5 PM</li>
                                            <li className="mb-2">Saturday: 10 AM - 2 PM</li>
                                            <li>Sunday: Closed</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div className="col-12 col-lg-6">
                            <div className="card border border-dark rounded shadow-sm overflow-hidden h-100">
                                <div className="card-body p-4">
                                    <h2 className="h4 mb-4">Contact Form</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Full Name</label>
                                            <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <input type="tel" className="form-control" id="phone" value={formData.phone} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Message</label>
                                            <textarea className="form-control" id="message" rows="4" value={formData.message} onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
