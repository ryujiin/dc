# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0016_auto_20150716_0413'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='carro',
        ),
    ]
