import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import "../assets/styles/addbusiness.css";

// ✅ Generate random business card data
const generateRandomBusiness = () => {
    const businesses = [
        {
            name: "Downtown Health Clinic",
            type: "Health Clinic",
            services: ["Appointments", "Walk-in", "Consultation"],
            city: "New York",
            state: "NY",
            zip: "10001",
        },
        {
            name: "Sunset Restaurant",
            type: "Restaurant",
            services: ["Dine-in", "Delivery", "Reservations"],
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
        },
        {
            name: "Elite Fitness Center",
            type: "Fitness",
            services: ["Membership", "Personal Training", "Group Classes"],
            city: "Chicago",
            state: "IL",
            zip: "60601",
        },
        {
            name: "City Dental Care",
            type: "Dental Clinic",
            services: ["Cleaning", "Whitening", "Checkups"],
            city: "Miami",
            state: "FL",
            zip: "33101",
        },
        {
            name: "Urban Coffee House",
            type: "Cafe",
            services: ["Takeaway", "Delivery", "Events"],
            city: "Houston",
            state: "TX",
            zip: "77001",
        },
    ];

    const pick = businesses[Math.floor(Math.random() * businesses.length)];

    return {
        id: crypto.randomUUID(),
        businessName: pick.name,
        businessType: pick.type,
        businessDescription:
            "A trusted local business serving customers with professionalism and great service.",
        contactName: "John Smith",
        email: "info@example.com",
        phone: "(555) 123-4567",
        address: "123 Main Street",
        city: pick.city,
        state: pick.state,
        zipCode: pick.zip,
        services: pick.services,
        isEditing: false,
    };
};

const AddBusinessPage = () => {
    const navigate = useNavigate();

    // ✅ 3 random cards by default
    const [businessCards, setBusinessCards] = useState([
        generateRandomBusiness(),
        generateRandomBusiness(),
        generateRandomBusiness(),
    ]);

    // ✅ For Edit/Save: store original snapshot to support Cancel
    const [editBackup, setEditBackup] = useState({});

    // ✅ For Delete: store original snapshot to support Cancel
    const [deleteBackup, setDeleteBackup] = useState({});

    // Form states
    const [businessName, setBusinessName] = useState("");
    const [businessDescription, setBusinessDescription] = useState("");
    const [contactName, setContactName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [timezone, setTimezone] = useState("Eastern Time (ET)");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");

    const [businessType, setBusinessType] = useState("");
    const [otherService, setOtherService] = useState("");
    const [customServices, setCustomServices] = useState([]);

    // ✅ Add business => create card on top
    const handleSubmit = (e) => {
        e.preventDefault();

        const newCard = {
            id: crypto.randomUUID(),
            businessName,
            businessType,
            businessDescription,
            contactName,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            services: businessType ? [businessType] : [],
            isEditing: false,
            isDeleting: false,
        };

        setBusinessCards((prev) => [newCard, ...prev]);

        alert("Business added successfully!");

        // Reset form fields
        setBusinessName("");
        setBusinessDescription("");
        setContactName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setState("");
        setZipCode("");
        setBusinessType("");
        setOtherService("");
        // Optional: keep custom services list or clear it? Usually keep it.
    };

    // Add custom service to dropdown
    const handleAddCustomService = () => {
        const val = otherService.trim();
        if (val && !customServices.includes(val)) {
            setCustomServices([...customServices, val]);
            setBusinessType(val);
            setOtherService("");
        } else {
            alert("Please enter a valid custom service!");
        }
    };

    // Reset form
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this business?")) {
            setBusinessName("");
            setBusinessDescription("");
            setContactName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setCity("");
            setState("");
            setZipCode("");
            setTimezone("Eastern Time (ET)");
            setOpeningTime("");
            setClosingTime("");
            setBusinessType("");
            setOtherService("");
            setCustomServices([]);

            alert("Business form data has been reset!");
            navigate("/adminBooking");
        }
    };

    // ✅ Toggle edit with backup for cancel

    const startEdit = (id) => {
        const current = businessCards.find((x) => x.id === id);
        setEditBackup((prev) => ({ ...prev, [id]: { ...current } }));
        setBusinessCards((prev) =>
            prev.map((b) => (b.id === id ? { ...b, isEditing: true } : b))
        );
    };

    const cancelDelete = (id) => {
        setBusinessCards((prev) =>
            prev.map((b) => (b.id === id ? { ...b, isDeleting: false } : b))
        );
    };

    const confirmDelete = (id) => {
        setBusinessCards((prev) => prev.filter((b) => b.id !== id));
    };

    const startDelete = (id) => {
        setBusinessCards((prev) =>
            prev.map((b) => (b.id === id ? { ...b, isDeleting: true } : b))
        );
    };

    const saveEdit = (id) => {
        setBusinessCards((prev) =>
            prev.map((b) => (b.id === id ? { ...b, isEditing: false } : b))
        );
        setEditBackup((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    const cancelEdit = (id) => {
        const backup = editBackup[id];
        if (!backup) return;

        setBusinessCards((prev) =>
            prev.map((b) => (b.id === id ? { ...backup, isEditing: false, isDeleting: false } : b))
        );

        setEditBackup((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    // ✅ Update card fields
    const updateCardField = (id, key, value) => {
        setBusinessCards((prev) =>
            prev.map((b) => (b.id === id ? { ...b, [key]: value } : b))
        );
    };

    // ✅ Add service under the same business card
    const addServiceToCard = (id, serviceName) => {
        const clean = serviceName.trim();
        if (!clean) return;

        setBusinessCards((prev) =>
            prev.map((b) => {
                if (b.id !== id) return b;
                if ((b.services || []).includes(clean)) return b;
                return { ...b, services: [...(b.services || []), clean] };
            })
        );
    };

    // ✅ Remove service from same business card
    const removeServiceFromCard = (id, serviceName) => {
        setBusinessCards((prev) =>
            prev.map((b) =>
                b.id === id
                    ? { ...b, services: (b.services || []).filter((s) => s !== serviceName) }
                    : b
            )
        );
    };

    return (
        <div className="add-business-container">
            <Sidebar />

            <main className="add-business-content">
                <header className="navbar">
                    <div className="navbar-content">
                        <h2 className="navbar-title">Add New Business</h2>
                        <p className="navbar-subtitle">
                            Set up a new business to use the AI Receptionist system.
                        </p>
                    </div>
                </header>

                <div className="page-stack">
                    {/* ✅ TOP: 3 random business cards */}
                    <section className="business-cards-section">
                        <h3 className="section-title">Businesses</h3>

                        <div className="business-cards-grid">
                            {businessCards.map((b) => (
                                <div key={b.id} className="business-card">
                                    <div className="business-card-head">
                                        <div>
                                            <h4 className="business-card-title">{b.businessName}</h4>
                                            <p className="business-card-sub">{b.businessType}</p>
                                        </div>

                                        <div className="card-actions">
                                            {!b.isEditing ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="card-btn"
                                                        onClick={() => startEdit(b.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="card-btn delete-btn"
                                                        onClick={() => startDelete(b.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {!b.isDeleting ? (
                                                        <button
                                                            type="button"
                                                            className="card-btn delete-btn"
                                                            onClick={() => startDelete(b.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="card-btn delete-btn"
                                                                onClick={() => confirmDelete(b.id)}
                                                            >
                                                                Confirm
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="card-btn secondary"
                                                                onClick={() => cancelDelete(b.id)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}

                                                    {!b.isDeleting && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="card-btn"
                                                                onClick={() => saveEdit(b.id)}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="card-btn secondary"
                                                                onClick={() => cancelEdit(b.id)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* VIEW MODE */}
                                    {!b.isEditing ? (
                                        <>
                                            <p className="business-card-desc">{b.businessDescription}</p>

                                            <div className="business-card-info">
                                                <div>
                                                    <span>Contact:</span> {b.contactName}
                                                </div>
                                                <div>
                                                    <span>Email:</span> {b.email}
                                                </div>
                                                <div>
                                                    <span>Phone:</span> {b.phone}
                                                </div>
                                                <div>
                                                    <span>Address:</span> {b.address}, {b.city}, {b.state}{" "}
                                                    {b.zipCode}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        /* EDIT MODE */
                                        <div className="business-card-edit">
                                            <div className="edit-grid">
                                                <div className="edit-field">
                                                    <label>Business Name</label>
                                                    <input
                                                        value={b.businessName}
                                                        onChange={(e) =>
                                                            updateCardField(b.id, "businessName", e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div className="edit-field">
                                                    <label>Services</label>
                                                    <input
                                                        value={b.businessType}
                                                        onChange={(e) =>
                                                            updateCardField(b.id, "businessType", e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div className="edit-field full">
                                                    <label>Description</label>
                                                    <textarea
                                                        value={b.businessDescription}
                                                        onChange={(e) =>
                                                            updateCardField(b.id, "businessDescription", e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div className="edit-field">
                                                    <label>Email</label>
                                                    <input
                                                        value={b.email}
                                                        onChange={(e) =>
                                                            updateCardField(b.id, "email", e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div className="edit-field">
                                                    <label>Phone</label>
                                                    <input
                                                        value={b.phone}
                                                        onChange={(e) =>
                                                            updateCardField(b.id, "phone", e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div className="edit-field full">
                                                    <label>Address</label>
                                                    <input
                                                        value={b.address}
                                                        onChange={(e) =>
                                                            updateCardField(b.id, "address", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ✅ SERVICES AREA (always visible) */}
                                    <div className="services-area">
                                        <div className="add-service-row">
                                            <input
                                                className="service-input"
                                                placeholder="Add service (e.g., Home Delivery)"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        addServiceToCard(b.id, e.currentTarget.value);
                                                        e.currentTarget.value = "";
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="card-btn"
                                                onClick={(e) => {
                                                    const input = e.currentTarget.previousSibling;
                                                    addServiceToCard(b.id, input.value);
                                                    input.value = "";
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>

                                        <div className="service-chips editable">
                                            {(b.services || []).map((s) => (
                                                <button
                                                    type="button"
                                                    key={s}
                                                    className="chip chip-removable"
                                                    onClick={() => removeServiceFromCard(b.id, s)}
                                                    title="Remove service"
                                                >
                                                    {s} ✕
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ✅ FORM CARD */}
                    <div className="form-card">
                        <section className="form-section">
                            <h3 className="section-title">Business Information</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Business Name *</label>
                                    <input
                                        type="text"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="e.g., Downtown Health Clinic"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description *</label>
                                    <textarea
                                        value={businessDescription}
                                        onChange={(e) => setBusinessDescription(e.target.value)}
                                        placeholder="e.g., About your business"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Service Type *</label>
                                    <select
                                        value={businessType}
                                        onChange={(e) => setBusinessType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select business type...</option>
                                        <option value="Health Clinic">Health Clinic</option>
                                        <option value="Restaurant">Restaurant</option>
                                        {customServices.map((service, index) => (
                                            <option key={index} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                        <option value="Other">Other (Custom)</option>
                                    </select>

                                    {businessType === "Other" && (
                                        <div className="custom-service-box">
                                            <label>Enter custom service type</label>
                                            <input
                                                type="text"
                                                value={otherService}
                                                onChange={(e) => setOtherService(e.target.value)}
                                                placeholder="Enter custom service type"
                                            />
                                            <button
                                                type="button"
                                                className="mini-btn"
                                                onClick={handleAddCustomService}
                                                disabled={!otherService}
                                            >
                                                Add Custom Service
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <h3 className="section-title">Contact Details</h3>

                                <div className="form-group">
                                    <label>Contact Person *</label>
                                    <input
                                        type="text"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        placeholder="Full name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="business@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone *</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(555) 000-0000"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Street Address *</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="123 Main Street"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="City"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>State *</label>
                                    <input
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        placeholder="State"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Zip Code *</label>
                                    <input
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        placeholder="12345"
                                        required
                                    />
                                </div>

                                <div className="footer-buttons">
                                    <button
                                        className="cancel-btn"
                                        // onClick={() => navigate("/adminBooking")}
                                        type="button"
                                    >
                                        Cancel
                                    </button>

                                    <button className="submit-btn" type="submit">
                                        Add Business
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* ✅ Separate Card */}
                    <div className="what-happens-next-card">
                        <h3>What happens next?</h3>
                        <ul>
                            <li>Your business will be added to the system immediately</li>
                            <li>An AI receptionist will be configured with default settings</li>
                            <li>You can customize AI responses and booking options in Settings</li>
                            <li>Contact information will be used for system notifications</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddBusinessPage;
