import { useCallback, useEffect, useMemo, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
};

const normalizeData = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (Array.isArray(data?.results)) {
    return data.results;
  }
  return [];
};

const getItemLabel = (item) => item.username || item.name || item.title || 'Unnamed user';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const endpoint = `${getApiBaseUrl()}/users/`;

  const fetchData = useCallback(async () => {
    try {
      setError('');
      console.log('Users endpoint:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      console.log('Users fetched data:', data);
      setItems(normalizeData(data));
    } catch (fetchError) {
      setError(fetchError.message);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = useMemo(
    () => items.filter((item) => getItemLabel(item).toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
          <h2 className="h4 mb-0">Users</h2>
          <a className="btn btn-link p-0" href={endpoint} target="_blank" rel="noreferrer">
            Open REST endpoint
          </a>
        </div>

        <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <label className="form-label fw-semibold" htmlFor="users-search">Search users</label>
            <input
              id="users-search"
              className="form-control"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by username"
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button type="button" className="btn btn-primary" onClick={fetchData}>Refresh</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>Clear</button>
          </div>
        </form>

        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Preview</th>
                  <th scope="col">Link</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    <td>{index + 1}</td>
                    <td>{getItemLabel(item)}</td>
                    <td className="text-muted small">{JSON.stringify(item).slice(0, 80)}...</td>
                    <td>
                      <a href={endpoint} className="link-primary" target="_blank" rel="noreferrer">
                        API Link
                      </a>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedItem(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title h5 mb-0">User Details</h3>
                <button type="button" className="btn-close" onClick={() => setSelectedItem(null)} />
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Users;