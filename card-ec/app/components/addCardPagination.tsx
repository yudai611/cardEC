'use client'

type Pages = {
    totalPages: number;
    currentPage: number;
    pageChangeHandle: (page: number) => void;
}

export const AddCardPagination = ({ totalPages, currentPage, pageChangeHandle }: Pages) => {

    const pageCount = () => {
        const pages = [];
        for(let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return pages;
    }

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={() => pageChangeHandle(currentPage - 1)}>前へ</button>
            )}
            <div>
                {pageCount().map((page) => (
                    <button className="num-btn" key={page} onClick={() => pageChangeHandle(page)}>{page}</button>
                ))}
            </div>
            {currentPage < totalPages && (
                <button onClick={() => pageChangeHandle(currentPage + 1)}>次へ</button>
            )}
        </div>
    )
}