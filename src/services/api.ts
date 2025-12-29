import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000", // NestJS backend
    withCredentials: true,
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        console.log("token", token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // 1️⃣ Access token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");

                const res = await axios.post(
                    "http://localhost:5000/auth/refresh",
                    { refreshToken }
                );

                const newAccessToken = res.data.accessToken;

                // 2️⃣ Save new token
                localStorage.setItem("access_token", newAccessToken);

                // 3️⃣ Update header
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                // 4️⃣ Retry failed request
                return api(originalRequest);
            } catch (err) {
                // Refresh failed → logout
                localStorage.clear();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default api;
