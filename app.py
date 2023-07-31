"""Flask app for Cupcakes"""
import os
from flask import Flask, request, jsonify
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///cupcakes')
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.get("/api/cupcakes")
def get_all_cupcakes():
    """ Get data of all cupcakes.
        Return JSON {cupcakes: [{id, flavor, size, rating, image_url}, ...]}
    """

    cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get("/api/cupcakes/<int:cupcake_id>")
def get_cupcake(cupcake_id):
    """Get a data of single cupcake
        Return JSON like: {cupcake: {id, flavor, size, rating, image_url}}
    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.post("/api/cupcakes")
def create_cupcake():
    """Create a cupcake with image_url, size, rating, flavor
        size, rating, flavor is required while image_url is optional
        Return JSON like: {cupcake: {id, flavor, size, rating, image_url}}
    """

    size = request.json["size"]
    rating = request.json["rating"]
    image_url = (request.json.get("image_url")
        if request.json.get("image_url")
        else ""
        )
    flavor = request.json["flavor"]

    new_cupcake = Cupcake(
        flavor=flavor,
        size=size,
        image_url=image_url,
        rating=rating
        )
    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return (jsonify(cupcake=serialized), 201)

@app.patch("/api/cupcakes/<int:cupcake_id>")
def update_cupcake(cupcake_id):
    """
    Updates cupcake with provided properties and values
    Respond with JSON of updated cupcake
    {cupcake: {id, flavor, size, rating, image_url}}.
    """
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    for (key,value) in request.json:
        cupcake[key] = value

    db.session.commit()

    serialized = cupcake.serialize()
    return jsonify(cupcake=serialized)



