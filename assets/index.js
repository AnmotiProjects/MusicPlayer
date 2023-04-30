window.onload = () => {
    const get = {
        element(query, element = document) {
            return element.querySelector(query);
        },
        elements(query, element = document) {
            return element.querySelectorAll(query);
        },
        funcGetElement(...args) {
            return () => this.element(...args);
        },
        funcGetElements(...args) {
            return () => this.elements(...args);
        }
    };
    class playlist {
        static table = get.element("#playlist");
        static header = get.element("thead tr", this.table);
        static getHeaders = get.funcGetElements("th", this.header);
        static getItems = get.funcGetElements("tbody tr", this.table);
    }

    const playlistData = [
        {
            x: "1",
            y: "2"
        },
        {
            x: "9"
        },
        {
            x: "4",
            z: "8"
        }
    ];
    const headers = [
        {
            name: "x",
            display: true,
            sort: "asc"
        },
        {
            name: "y",
            display: true,
            sort: "none"
        },
        {
            name: "z",
            display: false,
            sort: "none"
        }
    ];

    const sort = ["none", "asc", "desc"]

    headers.forEach((header) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = header.name;
        headerCell.setAttribute("sort", header.sort);
        if (!header.display) headerCell.style.display = sort[0];

        headerCell.addEventListener("click", (event) => {
            const thisSort = headerCell.getAttribute("sort");
            let sortIndex = sort.indexOf(thisSort);
            sortIndex++;
            if (sort.length - 1 < sortIndex) {
                sortIndex = 0;
            } else {
                Array.from(playlist.header.children).forEach((header) => {
                    header.setAttribute("sort", sort[0]);
                });
            }
            headerCell.setAttribute("sort", sort[sortIndex]);
        });
        playlist.header.appendChild(headerCell);
    });

    playlistData.forEach((data) => {
        const dataRow = document.createElement("tr");

        headers.forEach((header) => {
            const dataCell = document.createElement("td");
            dataCell.textContent = data[header.name] ?? "";
            if (!header.display) dataCell.style.display = "none";
            dataRow.appendChild(dataCell);
        });

        playlist.table.appendChild(dataRow);
    });
}