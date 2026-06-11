import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div className="m-4 ">
            Authenticated as: {auth.user?.username}
            <div className="mt-4">Existing files:</div>
            <div className="flex flex-col gap-4">
                {files.length === 0 ? (
                    <p className="text-gray-500">No files found. Storage is empty.</p>
                ) : (
                    files.map((file) => (
                        <div key={file.id} className="flex flex-row gap-4">
                            <p>{file.name}</p>
                        </div>
                    ))
                )}
            </div>
            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md cursor-pointer"
                    onClick={() => handleDelete()}
                >
                    Wipe App Data
                </button>
            </div>
        </div>
    );
};

export default WipeApp;