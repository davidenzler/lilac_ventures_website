/**
 * Fetches the PDF uploads based on the provided query.
 * 
 * @param query - Either step number or username.
 */
export async function getPDFUploads(query: string) {
    let endpoint;

    if (!isNaN(Number(query))) {
        endpoint = `http://127.0.0.1:8080/files/NewPDFUploads/step/${query}`;
    } else {
        endpoint = `http://127.0.0.1:8080/files/NewPDFUploads/username/${query}`;
    }

    try {
        const response = await fetch(endpoint);
        return await response.json();
    } catch (error) {
        alert(error);
        return [];
    }
}

/**
 * Deletes the PDF upload based on the provided fileName.
 * 
 * @param fileName - The name of the file to be deleted.
 */
export async function deletePDFUpload(fileName: string) {
    const endpoint = `http://127.0.0.1:8080/files/NewPDFUploads/${fileName}`;

    try {
        const response = await fetch(endpoint, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        alert(error);
        return null;
    }
}

