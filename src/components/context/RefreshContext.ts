import { useRouter } from 'next/navigation';
import refresh from "@/app/api/login/refresh";
import Cookies from "js-cookie";

export const useHandleRefreshToken = () => {
    const router = useRouter();

    const handleRefreshToken = async () => {
        try {
            const response = await refresh();
            if (response && response.status === 200) {
                console.log("Token refrescado correctamente");
            } else {
                Cookies.remove('auth_token');
                router.push('/login');
            }
        } catch (error) {
            console.error('Error al refrescar:', error);
            Cookies.remove('auth_token');
            router.push('/login');
        }
    };

    return { handleRefreshToken };
}
